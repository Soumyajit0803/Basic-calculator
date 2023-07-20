class Calculator{
    constructor(smallLabel, bigLabel){
        this.smallLabel = smallLabel
        this.bigLabel = bigLabel
        this.clearAll();
    }

    autoScroll(){
        this.bigLabel.scrollTo(this.bigLabel.value.length*30,0)
        this.smallLabel.scrollTo(this.smallLabel.value.length*30,0)
    }
    clearAll(){
        this.smallLabel.value = ""
        this.bigLabel.value = ""
        console.log('cleared big input and small input')
    }

    clearCurrent(){
        this.bigLabel.value = ""
        console.log("Cleared big input")
        this.autoScroll()
    }

    delete(){
        if(/-?Infinity/g.test(this.bigLabel.value)){
            this.bigLabel.value = ""
        }
        this.bigLabel.value = this.bigLabel.value.slice(0, -1)
        this.autoScroll()
    }

    append(element){

        let current = this.bigLabel.value
        let clicked = element.dataset.value

        //bad result
        if(/-?Infinity/.test(current)){
            this.bigLabel.value = ""
            return
        }

        //sign
        else if(current === "" && /(\+|\-)$/g.test(clicked)){
            this.bigLabel.value+=clicked
        }

        //two operators adjacent
        else if ((/(\+|\-|\*|\/|\^)$/g.test(current) || current === "") && /(\+|\-|\*|\/|\^)/g.test(clicked)){ 
            return
        }

        //num*( functionality
        else if(clicked === "(" && /(\d|\))$/g.test(current.slice(-1))){
            console.log("num(")
            this.bigLabel.value+="*"+clicked
        }

        //)*num functionality
        else if(current.slice(-1) === ")" && /(\d|\()/g.test(clicked)){
            console.log(")num")
            this.bigLabel.value+="*"+clicked
        }

        //abnormal decimals e.g:  2.2.2 and ..7
        else if(/\.\d*$/g.test(current) && clicked === "."){
            return
        }

        //valid exp building
        else{
        this.bigLabel.value+=clicked
        }
        this.autoScroll()            
    }

    compute(){
        let answer
        try{
            answer = eval(this.bigLabel.value.replace("^", "**"))
        }
        catch(e){
            console.log("Error!")
            return
        }

        this.smallLabel.value = this.bigLabel.value
        this.bigLabel.value = answer.toString()
        this.autoScroll()
    }
}

const numsAndOps = document.querySelectorAll('[data-value]')

const equal = document.querySelector('[data-EQUAL]')
const del = document.querySelector('[data-DEL]')
const ac = document.querySelector('[data-AC]')
const c = document.querySelector('[data-C]')
const smallLabel = document.querySelector('.inp-box')
const bigLabel = document.querySelector('.out-box')
console.log(bigLabel)
const calculator = new Calculator(smallLabel, bigLabel)
// console.log(numsAndOps[4].dataset.value)

numsAndOps.forEach(btn => {
    btn.addEventListener('click', () => {
      calculator.append(btn)
    })
})

del.addEventListener('click', ()=>{
    calculator.delete()
})

ac.addEventListener('click', ()=>{
    calculator.clearAll()
})

c.addEventListener('click', ()=>{
    calculator.clearCurrent()
})

equal.addEventListener('click', ()=>{
    calculator.compute()
})

//Infinity as result
//num/00 is error
// 3**0 is giving 1 instead of errors
// rounding required




