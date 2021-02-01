const validate = (fields) => {
  let errorMessage = ''
  for(let i =0; i<fields.length; i++){
    let f = fields[i]
    let value = ''
    const rules = f.rules
    // console.log(rules[0])
    if(f.rules[0] == 'confirmAgreement'){
      // console.log(f.value, f.name)
      if(!f.value){
        errorMessage = 'You must agree to terms'
      }
      break
    }else{
      value = f.value.trim()
    }
    
    
    
    rules.every(r => {
      switch(true){
        case (r == 'required' && value.length == 0):
          errorMessage = `${f.name} is required`
          break
        case (r.indexOf('sameAs-') == 0):{
          let fieldName =  r.substr(r.indexOf('-')+1, r.length)
          
          const otherField = fields.filter((f) => f.name == fieldName)[0]

          if(f.value != otherField.value){
            errorMessage = `${f.name} is not same as ${otherField.name}`
          }
          
          break
        }
        case (r.indexOf('len-') == 0):{
          const len =  Number(r.substr(r.indexOf('-')+1, r.length))
          if(value.length != len){
            errorMessage = `${f.name} needs to be ${len} chars long`
          }
          break
        }
        case (r.indexOf('min-') == 0):{
            const min =  Number(r.substr(r.indexOf('-')+1, r.length))
          if(value.length < min){
            errorMessage = `${f.name} needs to be minimum ${min} chars`
          }
          break
        }
        case (r.indexOf('max-') == 0):{
          const max =  Number(r.substr(r.indexOf('-')+1, r.length))
          if(value.length > max){
            errorMessage = `${f.name} cannot be more than ${max} chars`
          }
          break
        }
        case (r == 'email'):{
          
        

          
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const status = re.test(String(value).toLowerCase())
            if(!status){
              errorMessage = `${f.name} is not a valid email`
            }
        
          break
        }
            
      }
      
      // console.log(errorMessage)
      // if(errorMessage){
      //   return
      // }
      // return false
      
      
    }) 
    
    if(errorMessage){
      break
    }
  }
  return errorMessage
}

export const validator = {
  validate
}

// const schema = [
//   {
//     name: 'firstname',
//     value: 'dd',
//     rules:['required']
//   },
//   {
//     name: 'lastname',
//     value: 'kkkd',
//     rules:['required']
//   },
//   {
//     name: 'username',
//     value: 'kdkdkdkdk',
//     rules:['required']
//   },
//   {
//     name: 'email',
//     value: 'a.sks@kkdd.com',
//     rules:['email']
//   },
//   {
//     name: 'phone',
//     value: '09090909090',
//     rules:['len-11']
//   },
//   {
//     name: 'agree',
//     value: true,
//     rules:['confirmAgreement']
//   }
// ]

// console.log(validator.validate(schema))
// validator.validate(schema)