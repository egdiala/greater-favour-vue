export default {
  formatCurrency: (amount) =>{
      if(amount.length < 4){
              return
          }
          let prefix = ''
          if(amount<0){
              prefix ="-"
              amount = -1*amount
          }
           
          amount =  parseFloat(amount/100).toFixed(2)
          let amountPair = amount.split('.')
          const primary = amountPair[0]
          const secondary = amountPair[1]
          let currency = []
          for(let i=primary.length; i>=0; i-=3){
              
              if(primary.substring(i-3,i).length>0){

                  currency.push(primary.substring(i-3,i))
              }

          }
          let formatedCurrency = ''
          try {
              
              formatedCurrency = currency.reverse().join().toString() + '.' + secondary.toString()
          } catch (error) {
              formatedCurrency = ''
          }
          return prefix+formatedCurrency
  },
  titleCase: (text) =>{
      return text[0].toUpperCase() + text.substr(1, text.length)
  },
  date:(date) => {
      const d = new Date(date)
      const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
      const month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth()
      const year = d.getFullYear()
      return `${day}/${month}/${year}`
  },
  datetime:(date) => {
      const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const d = new Date(date)
      const day = d.getDate()
      const month = d.getMonth()
      const year = d.getFullYear()
      const hour = d.getHours() == 0 ? '12' : d.getHours()
      const minutes = d.getMinutes()
      const suffix = (d.getHours() >= 12 ? 'PM' : 'AM')
      return `${day} ${m[month]}, ${year}   ${hour}:${minutes} ${suffix} `
  },
  mobile: () => {
      
  }
}

