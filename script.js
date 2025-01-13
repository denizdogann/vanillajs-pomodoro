class Timer{
    constructor(root){
        root.innerHTML = Timer.getHTML();

        this.el = {
            control: root.querySelector(".control-btn"),
            minutes: root.querySelector(".min"),
            seconds: root.querySelector(".sec"),
            testPanel: root.querySelector(".test-panel")

        }
        this.interval = null
        this.remainingSeconds = 0

        this.el.control.addEventListener("click", () =>{
            console.log("TIKLANDIM")
            this.setTheTimer()
            this.startTheTimer()
        })
        
    }
    setTheTimer(){
        this.remainingSeconds = 70;
        
    }
    startTheTimer(){
        if (this.remainingSeconds == 0){
            return
        }
        this.interval = setInterval(()=>{
            this.remainingSeconds --;
            this.updateTheTimer()
            if (this.remainingSeconds === 0) {
                this.stopTheTimer();
            }
        },1000)
    }
    stopTheTimer(){
        clearInterval(this.interval);
        this.interval = null
    }
    updateTheTimer(){
        const minutes = Math.floor(this.remainingSeconds / 60)
        const seconds = this.remainingSeconds % 60
        this.el.minutes.textContent = minutes 
        this.el.seconds.textContent = seconds 
        this.el.testPanel.textContent = this.remainingSeconds
    }

    
    

    static getHTML(){
        return `
        <span class="min">bogax</span>
        <span class="sec">mesu</span>
        <span class="test-panel"></span>
        <button class="control-btn">click me</button>
        `
    }
}

new Timer(document.querySelector("#timer"))