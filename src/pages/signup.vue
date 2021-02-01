<template>
	<div class="d-flex justify-content-center align-items-center">
		<transition name="slide-fade">
			<div v-if="errorMessage"
				class="signUp-topbar d-flex align-items-center justify-content-md-end justify-content-center mt-md-0 mb-md-0 mt-20 mb-1 "
				style="position: fixed; top: 1em; right: 1em; z-index: 99999">
				<div class="mb-0 mt-3">
					<div class="alert alert-danger" role="alert">
						{{errorMessage}}
					</div>
				</div>
			</div>
		</transition>
		<div v-if="signUpStatus">
			<div class="d-flex flex-column align-items-center">
				<img src="@/assets/img/checkmark.gif" width="100" class="mb-5" />
				Yeep! Signup was successful
				<span @click="silentLogin" class="mt-3">
					<spinner-button label="Proceed to verification" :loading="loader" style="width:280px"  />
				</span>							
			</div>
		</div>
		<div class="signUp-admin-right  p-md-40 p-10" v-if="!signUpStatus">
			<div
				class="signUp-topbar d-flex align-items-center justify-content-md-end justify-content-center mt-md-0 mb-md-0 mt-20 mb-1">
				<p class="mb-0">
					Already have an account?
					<router-link to="/login" class="color-primary">Sign in</router-link>
				</p>
			</div>
			<div class="row justify-content-center">
				<div class="col-xl-9 col-lg-10 col-md-12 ">
					<div class="edit-profile mt-md-25 mt-0">
						<div class="card border-0">
							<div class="card-header border-0  pb-md-15 pb-10 pt-md-20 pt-10 ">
								<div class="edit-profile__title">
									<h6>
										Sign up to
										<span class="color-primary">Admin</span>
									</h6>
								</div>
							</div>
							<form @submit.prevent="register" method="">
								<div class="card-body">
									<div class="edit-profile__body">
										<div class="form-group">
											<div class="row">
												<div class="col-sm-6">
													<label for="name">Firstname</label>
													<input v-model.trim="$v.fname.$model"
													:class="{'error': $v.fname.$error}"
													type="text"
														class="form-control" id="fname"
														placeholder="enter here" />
												</div>
												<div class="col-sm-6">
													<label for="name">Lastname</label>
													<input v-model.trim="$v.lname.$model"
													:class="{'error': $v.lname.$error}"
													type="text"
														class="form-control" id="lname"
														placeholder="enter here" />
												</div>
											</div>
										</div>

										<div class="form-group">
											<div class="row">
												<div class="col-sm-6">
													<label for="username">username</label>
													<input v-model.trim="$v.username.$model" type="text"
														class="form-control"
														:class="{'error': $v.username.$error}"
														id="username"
														placeholder="Username" />
														<small v-if="suggestedUsername" class="text-mute" :class="{'no-display': $v.username.$model.length}" @click="username = suggestedUsername">{{ suggestedUsername}}</small>
												</div>
												<div class="col-sm-6">
													<label for="name">phone number</label>
													<input v-model.trim="$v.phone.$model"
													:class="{'error': $v.phone.$error}"
													maxlength="11"
													type="text"
														class="form-control" id="phone"
														placeholder="Phone" />
												</div>
											</div>
										</div>

										<div class="form-group mb-20">
											<label for="email">Email Adress</label>
											<input v-model.trim="$v.email.$model"
											:class="{'error': $v.email.$error}"
											type="text" class="form-control lowercase"
												id="email" placeholder="name@example.com" />
										</div>
										<div class="form-group mb-15">
											<label for="password-field">password</label>
											<div class="position-relative">
												<input v-model.trim="$v.password.$model"
												:class="{'error': $v.password.$error}"
												id="password-field"
													:type="type1" class="form-control"
													name="password" value="" />
												<span :class="
				`fa fa-fw ${eye1} text-light fs-16 field-icon toggle-password2`
				" @click="show(1)"></span>
											</div>
											<small v-if="$v.password.$error" class="error">Password must be at least 6 char length</small>
										</div>
										<div class="form-group mb-15">
											<label for="password-field">Re-type password</label>
											<div class="position-relative">
												<input v-model.trim="$v.confirmPassword.$model"
												:class="{'error': $v.confirmPassword.$error}"
													id="confirmPassword-field" :type="type2"
													class="form-control" name="password" value="" />
												<span :class="
				`fa fa-fw ${eye2} text-light fs-16 field-icon toggle-password2`
				" @click="show(2)"></span>
											</div>
											<small v-if="$v.confirmPassword.$error" class="error">Passoword does not match</small>
										</div>
										<div class="signUp-condition">
											<div class="checkbox-theme-default custom-checkbox ">
												<input class="checkbox" type="checkbox"
												:class="{'error': $v.agree.$error}"
												v-model.trim="$v.agree.$model"
													id="check-1" />
												<label for="check-1">
													<span class="checkbox-text">Creating an account
														means you’re okay with
														our
														<a href="https://greaterfavour.foundation/terms-condition.html" class="color-secondary">Terms of
															Service</a>
														and
														<a href="https://greaterfavour.foundation/privacy-policy.html" class="color-secondary">Privacy
															Policy</a>
														my preference</span>
												</label>
											</div>
										</div>
										<div
											class="button-group d-flex pt-1 justify-content-md-start justify-content-center">
											<button type="submit" :disabled="isLoading"
												class="btn btn-primary btn-default btn-squared text-capitalize lh-normal px-50 py-15 signUp-createBtn signIn-createBtn">
												<span v-show="isLoading"
													class="spinner-border spinner-border-sm"></span>{{ isLoading == true ? "" : "Create Account" }}
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { required, email, sameAs, minLength, maxLength  } from "vuelidate/lib/validators";
import { authComputed } from "../vuex/helpers.js";
import { publicClient } from "@/plugins/restclient.js";
import SpinnerButton from "@/components/SpinnerButton";

export default {
  layout: "landing",
  components:{
	SpinnerButton,
  },
  data() {
    return {
		fname: "",
		lname: "",
		username: "",
		email: "",
		role: 8,
		phone: "",
		password: "",
		confirmPassword: "",
		suggestedUsername: '',
		eye1: "fa-eye-slash",
		type1: "password",
		eye2: "fa-eye-slash",
		type2: "password",
		errorMessage:'',
		isLoading: false,
		signUpStatus: false,
		agree:false,
		loader:false,
		loginCounter: 1
    };
  },
  metaInfo: {
    title: "Greater Favour",
    titleTemplate: "%s | Sign Up",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
  watch:{
	agree(){
		this.errorMessage = ''
	},
	fname(){
		this.suggestUsername()
	},
	lname(){
		this.suggestUsername()
	},
	
  },
  computed: {
	...authComputed,

  },
  methods: {
	suggestUsername(){
		if(this.$v.fname.$model.length & this.$v.lname.$model.length){
			const randNumber = Math.ceil(Math.random()*100)
			const pick = Math.ceil(Math.random()*10)
			switch (pick){
				case 1:
					this.suggestedUsername  = this.fname + this.lname
				break;

				case 2:
				this.suggestedUsername = this.lname + this.lname
				break;
				case 3:
					this.suggestedUsername = this.fname + '.' + this.lname
				break;
				case 4:
					this.suggestedUsername = this.lname + '.' + this.fname
				break;
				case 5: 
					this.suggestedUsername = this.fname + this.lname + randNumber
				break;
				case 6:
					this.suggestedUsername = this.lname + this.fname + randNumber
				break;
				case 7:
					this.suggestedUsername = this.fname +  '.' + this.lname + randNumber
				break;
				default:
					this.suggestedUsername = this.lname + '.' +  this.fname + randNumber
				break;
			}
			
		}else{
			this.suggestedUsername = ''
		}
		
		return this.suggestedUsername
	},
    register() {
		this.$v.$touch()
		if(this.$v.$invalid){
			if(this.$v.agree.$error){
				this.errorMessage = 'You need to agree to terms'
			}
			return
		}
		const credentials = {
			fname: this.fname,
			lname: this.lname,
			username: this.username,
			password: this.password,
			mobile: this.phone,
			email: this.email.toLowerCase(),
			role: this.role,
		}
		this.isLoading = true
		publicClient
        .post("/v1/daemon/start/register", credentials)
        .then((data) => {
			this.success = true;
			this.isLoading = false
			this.signUpStatus = true
			this.$store.commit("SET_USER_DATA", data);
			// this.silentLogin()
        }).catch((err) => {
			this.isLoading = false
			if(err.response){
				this.errorMessage = err.response.data.message
			}
          
        })
	},
	silentLogin(){
		this.loader = true
		publicClient
		.post("/v1/daemon/start/login", {username: this.username, password: this.password})
		.catch((err)=>{
			this.loader = false
			if(err.response.data.action.name == 'user.verification'){
				localStorage.setItem('jwt', err.response.data.info.token)
				this.$router.push({name:'verify-user', params:{user: err.response.data.info.user, action:'user.verification'}})
			}
		})
	},
    show(id) {
      if (id == 1) {
        if (this.type1 == "text") {
          this.type1 = "password";
          this.eye1 = "fa-eye-slash";
        } else {
          this.type1 = "text";
          this.eye1 = "fa-eye";
        }
      } else {
        if (this.type2 == "text") {
          this.type2 = "password";
          this.eye2 = "fa-eye-slash";
        } else {
          this.type2 = "text";
          this.eye2 = "fa-eye";
        }
      }
    },
  },
  validations:{
	fname:{
		required
	},
	lname:{
		required
	},
    username:{
      required
	},
	email:{
		required,
		email
	},
	phone:{
		required,
		minLength:minLength(11),
		maxLength:maxLength(11)
	},
	password:{
		required,
		minLength: minLength(6)
	},
	confirmPassword:{
		required,
		sameAsPassword: sameAs('password'),
		minLength: minLength(6)
	},
	agree:{
		mustBeTrue: (val) => val == true
	}

  }
};
</script>
<style scoped>

</style>