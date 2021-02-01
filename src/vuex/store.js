import Vue from "vue";
import Vuex from "vuex";
import { apiClient, publicClient } from "../plugins/restclient.js";
import router from "../router";
import { getTimestamp } from "@/utilities";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        error: '',
        credentials: {},
        otp: null,
        xid: null,
        olid: "",
        status: "",
        classes: [],
        subjects: [],
        topics: [],
        banks:[],
        primary:[],
        junior:[],
        senior:[],
        fees:[],
        themes: [],
        verifyStatus: "",
        verification: false,
        isLoading: false,
        asyncLoader: false,
        router:{},
        ctoast: {
            type: '',
            message: ''
        },
        verify: false,
        verifyBVN: false,
        offline: false
    },
    mutations: {
        SET_OFFLINE(state, status){
            state.offline = status
        },
        loader(state, status){
            state.asyncLoader = status
        },
        loading(state, data){
            state.isLoading = data
        },
        credentials(state, data){
            state.credentials = data
        },
        ctoast(state, error){
            state.ctoast = error
        },
        avatar(state, data){
            state.user.avatar = data
        },
        router(state, data){
            state.router = {
                ...state.router,
                ...data
            }
        },
        totalClasses (state, payload) {
            state.classes = payload;
        },
        primary(state, data){
            state.primary = data
        },
        junior(state, data){
            state.junior = data
        },
        senior(state, data){
            state.senior = data
        },
        SET_USER_DATA(state, userData) {
            if (userData.info != null) {
                state.user = userData.info.user;
                localStorage.setItem("user", JSON.stringify(userData.info.user));
                localStorage.setItem("jwt", userData.info.token);
                publicClient.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${userData.info.token}`;
                apiClient.defaults.headers['Authorization'] = `Bearer ${userData.info.token}`;
            }
        },
        CLEAR_USER_DATA(state) {
            localStorage.clear();
            location.reload();
            state.user = null;
        },
        SET_USER_OTP(state, data) {
            state.otp = data.data.info.expires;
            state.olid = data.data.info.olid;
        },
        SET_USER_STATUS(state, data) {
            state.status = data;
        },
        TOTAL_CLASSES(state, data) {
            state.classes = data;
        },
        TOTAL_SUBJECTS(state, data) {
            state.subjects = data;
        },
        SET_THEMES(state, data){
            state.themes = data
        },
        TOTAL_TOPICS(state, data) {
            state.topics = data;
        },
        BANK_LISTING(state, data) {
            state.banks = data;
        },
        INIT_STORE(state) {
            const userString = localStorage.getItem("user");
            const userStatus = localStorage.getItem('verification');
            if (userStatus) {
                state.verification = true;
            } else {
                state.verification = false;
            }
            
            if (userString) {
                const userData = JSON.parse(userString);
                state.user = userData;
            }
        },
    },
    actions: {
        quickLogin({state}){
            publicClient
            .post("/v1/daemon/start/login", {username: state.credentials.username, password: state.credentials.password})
            .then((res)=>{
                publicClient.defaults.headers['Authorization'] = `Bearer ${res.data.info.token}`;
                localStorage.setItem('jwt', res.data.info.token)
            })
            .catch(() => {
                this.quickLogin()
            })
        },
        logout({ commit }) {
            commit("CLEAR_USER_DATA");
        },
        checkStatus(){
            localStorage.removeItem('onboarding')
            const user = JSON.parse(localStorage.getItem('user'))
            const headers =  {
                    "X-Ulid": user.ulid,
                    "Authorization": `Bearer ${localStorage.getItem('jwt')}`
                }
             publicClient.get('/v1/engine/core/status',{
                headers: headers
            }).then(r => {

                const actions = r.data.info.actions
                if(actions.length == 0){
                    router.push('/')
                    return
                }
                const action = actions[0].action

                if(action.indexOf('document') >= 0){

                    const documents = actions.filter(o => o.action.indexOf('document') >= 0)

                    const data  = {
                        step: 'document-upload',
                        documents
                    }
                    localStorage.setItem('onboarding', JSON.stringify(data))
                    router.push({name: 'onboarding-document-upload'})

                }else if(action.indexOf('interest') >= 0){

                    const data = {
                        step: 'interest',
                    }

                    localStorage.setItem('onboarding', JSON.stringify(data))
                    router.push({name: 'onboarding-interest'})

                }else{
                    router.push('/')
                }
            })
        },
        environment({commit}){
            const user = JSON.parse(localStorage.getItem('user'))
            const headers = {
                'X-Ulid': `${user.ulid}`,
                "X-Timestamp": getTimestamp(),
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            };
        
            publicClient.get('/v1/engine/core/environment',{
                headers
            })
            .then(res => {
                let themes = res.data.info.themes
                themes = Object.keys(themes).map(i => themes[i]);

                commit('SET_THEMES', themes)
            })
            .catch(err => console.log('dkdk', err))
        }
    },
    getters: {
        loggedIn(state) {
            return !!state.user;
        },
        allClasses(state) {
            return state.classes;
        },
        allSubjects(state) {
            return state.subjects;
        },
        allTopics(state) {
            return state.topics;
        },
        user(state){
            return state.user
        }
    },
});