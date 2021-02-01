
const roleMap = {
  1 : "Student",  
  2 : "Guardian",
  4: "Tutor",
  8: "Official",
  16: "Support",
  32 : "Admin",
  64: "Super Admin",
  128: "System",
  256: "Master"
}

const roles = [
  
  // {label:'Student' , code: 1 },
  // {label:'Guardian' , code: 2 },
  {label:'Tutor' , code: 4 },
  {label:'Offical' , code: 8 },
  {label:'Support' , code: 16 },
  {label:'Admin' , code: 32 },
  {label:'Super Admin' , code: 64 },
  // {label:'System' , code: 128 },
  // {label:'Master' , code: 256 },
  
]
const roleAttributes = [
  {name: 'Teacher', code: 1},
  {name: 'Nomializer', code: 2},
  {name: 'Review', code: 4},
  {name: 'Approval', code: 8},
  {name: 'Finance', code: 16}
]
const roleAttributesMap = {
  "1" : "Teacher", 
  "2" : "Nomalizer", 
  "4" : "Revieew", 
  "8" : "Approval", 
  "16" : "Finance", 
}

const progress = {
  "-1": "Diaspprove",
  "0": "Pending",
  "1": "Approved"
}
const progressColour = {
  "-1": "text-danger",
  "0": "text-info",
  "1": "text-success"
}
const progressIcon = {
  "-1": "las la-times",
  "0": "las la-pause-circle",
  "1": "las la-check"
}

const questionTypeMap = {
  "1": "Dichotomous",
  "2": "Simple",
  "4": "Multi",
  "8": "Rank",
  "16": "Open"
}

export {
  roleMap,
  roles,
  roleAttributes,
  roleAttributesMap,
  questionTypeMap,
  progress,
  progressColour,
  progressIcon
}