class Timer{
    constructor(root){
        root.innerHTML = Timer.getHTML();

        this.el = {
            control: root.querySelector(".control-btn"),
            minutes: root.querySelector(".min"),
            seconds: root.querySelector(".sec"),
            testPanel: root.querySelector(".test-panel"),
            shortBreak: root.querySelector(".mode__btn--short"),
            longBreak: root.querySelector(".mode__btn--long"),
            pomodoro: root.querySelector(".mode__btn--pomodoro"),

        }
        this.modes = {
            "pomodoro": 25*60,
            "short": 5*60,
            "long":15*60
        }
        
        this.interval = null
        this.remainingSeconds = 30
        this.mode = "pomodoro"
        

        this.el.pomodoro.addEventListener("click", ()=>{
            this.mode = "pomodoro"
            this.changeTheTheme("pomodoro")
        })

        this.el.shortBreak.addEventListener("click", ()=>{
            this.el.shortBreak.classList.add("active");
            this.mode = "short"
            this.changeTheTheme("short")
        })

        this.el.longBreak.addEventListener("click", ()=>{
            this.el.longBreak.classList.add("active");
            this.mode = "long"
            this.changeTheTheme("long")
        })

        this.el.control.addEventListener("click", () =>{
            if(this.interval == null){
                console.log("BAŞLAMAK İÇİN TIKLANDIM")
                this.startTheTimer()
            }
            else{
                console.log("PAUSE")
                this.pauseTheTimer()
            }
            
        })
        
    }
    pauseTheTimer(){
        clearInterval(this.interval)
        this.interval = null
        this.el.control.innerHTML = `<span class="test-svg material-icons">play_arrow</span>`
    }
    
    startTheTimer(){
        if (this.remainingSeconds === 0){
            return
        }
        this.el.control.innerHTML = `<span class="test-svg material-icons">pause</span>`
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
        this.interval = null;
        this.remainingSeconds = this.modes[this.mode]
        console.log("DURDUM")
        this.el.control.innerHTML = `<span class="test-svg material-icons">play_arrow</span>`
    }
    
    updateTheTimer(){
        const minutes = Math.floor(this.remainingSeconds / 60)
        const seconds = this.remainingSeconds % 60
        this.el.minutes.textContent = minutes.toString().padStart(2, "0")
        this.el.seconds.textContent = seconds.toString().padStart(2, "0")
    }

    changeTheTheme(mode){
        this.el.pomodoro.classList.remove("active")
        this.el.shortBreak.classList.remove("active")
        this.el.longBreak.classList.remove("active")
        switch(mode){
            case "pomodoro":
                this.remainingSeconds = this.modes[this.mode]
                document.body.style.background = "#E63820";
                this.el.pomodoro.classList.add("active")
                break;
            case "long":
                this.remainingSeconds = this.modes[this.mode]
                this.el.longBreak.classList.add("active")
                document.body.style.background = "#1F3DC4";
                break;
            case "short":
                this.remainingSeconds = this.modes[this.mode]
                this.el.shortBreak.classList.add("active")
                document.body.style.background = "#36B53B";    
                break;

        }

        
    }

    //#1F3DC4 #36B53B #E63820
    

    static getHTML(){
        return `
        <div class="timer__container">
            <span class="min">25</span>
            <span>:</span>
            <span class="sec">00</span>
        </div>
        <button class="control-btn"><span class="test-svg material-icons">play_arrow</span></button>
        
        <div class="modes">
            <button class="mode__btn mode__btn--pomodoro active">pomodoro</button>
            <button class="mode__btn mode__btn--short">short break</button>
            <button class="mode__btn mode__btn--long">long break</button>
            
        </div>
        `
    }
}

new Timer(document.querySelector("#timer"))