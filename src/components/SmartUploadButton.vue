<template>
    <div class="d-flex">
        <span @click="browseUploadAction">
            <spinner-button :label="button.label" :loading="button.active" />
        </span>
        
        <span>
            <input 
                type="file" 
                class="form-control-file d-none" 
                :id="docName"
                accept=".pdf"
                multiple="false"
                @change="fileChange()"
            >
        </span>
        <div class="atbd-upload__file ml-2">
        <ul>
            <li @click="deleteFile">
                <a href="#!" class="file-name"><i class="las la-paperclip"></i> <span class="name-text">{{ file.name || 'No File'}}</span></a>
                <a href="#!" class="btn-delete"><i class="la la-trash"></i></a>
            </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getTimestamp } from "@/utilities";
import { publicClient } from "@/plugins/restclient";
import SpinnerButton from './SpinnerButton.vue';
import { mapState } from 'vuex';
export default {
  components: { SpinnerButton },
    data(){
        return{
            button:{
                label: 'Choose File',
                active: false
                
            },
            fileReader: '',
            file: '',
        }
    },
    props:['document'],
    computed:{
        docName(){
            return this.document.action.split('.')[1]
        },
        ...mapState(['user'])
    },
    methods:{
        browseUploadAction(){
            if(this.button.label == 'Choose File'){
                document.getElementById(this.docName).click()
            }else{
                this.uploadDocument()
            }
            
        },
        fileChange() {
            this.fileReader = new FileReader();
            this.file = document.getElementById(`${this.docName}`).files[0]
            this.file.name ? this.button.label = 'Upload' : this.button.title = 'Choose File'
            this.fileReader.readAsDataURL(this.file);
        },
        deleteFile(){
            this.file = ''
            document.getElementById(this.docName).value = ''
            this.button.label = 'Choose File'
        },
        uploadDocument(){
            const tag = this.document.action.replace('.', '')
            
            const data ={
              data: this.fileReader.result,
              tag: this.docName.toUpperCase(),
              title: this.document.action.replace('.', ' ')
            }

            this.button.active = true
            const user =  JSON.parse(localStorage.getItem('user'))
            publicClient.post('/v1/office/account/document/add' , data, {
                headers:{
                    "X-Timestamp": getTimestamp(),
                    "X-Ulid": `${user.ulid}`,
                    "Authorization": `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then(() =>{
                this.button.active = false
                this.$emit('uploadSuccess', tag)
            })
            .catch((err) => {
                // this.$emit('uploadSuccess', tag)
                this.$store.commit('ctoast', {type: 'warning', message: err.response.data.message, timeout: 10000})
                this.button.active = false
            })

        }
    }
}
</script>

<style>
.atbd-upload__file .btn-delete{
    opacity: 1 !important;
    visibility: visible !important;
}
</style>