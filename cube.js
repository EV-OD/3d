
class Box extends Mesh{
    static get observedAttributes(){
        return ["width","height","depth","rotatex","rotatey","rotatez"]
    }
    constructor(className){
        super(className)
        this.faces = {
            front:"",
            back:"",
            left:"",
            right:"",
            top:"",
            down:""
        }
        this.setupCube()
    }

    attributeChangedCallback(name, oldValue, newValue){
        let value = this.__transformProperty[name]
        console.log(this.__transformProperty)
        if(value){
            this.__transformProperty[name][0] = newValue
        }
        this.reRender()
    }

    setupCube(){
        this.setupFace()
    }
    createFace(type){
        let face = document.createElement("div")
        face.className = `face ${type}`
        this.faces[type] = face
        this.mainElt.appendChild(face)
    }

    loopFaces(func){
        for(const key in this.faces){
            func(key)
        }
    }

    createInitialFaces(){
        this.loopFaces(key=> this.createFace(key))
    }
    setupFacesStyle(){
        let style  = {
            transformOrigin: "center",
            width: "var(--width)",
            height: "var(--height)",
            backgroundColor: "rgba(100, 200, 100, 0.5)",
            boxSizing: "border-box",
            border: "1px solid gray",
            position: "absolute"
        }
        this.loopFaces(key=> Object.assign(this.faces[key].style, style))
    }
    setTopFace(){
        this.faces.top.style.setProperty("--offset","calc(var(--halfheight) - var(--halfdepth))")
        Object.assign(this.faces.top.style,{
            "height": "var(--depth)",
            "transform": `translatey(calc(var(--halfheight) + var(--offset)))
      rotatex(90deg)`
        })
    }

    setDownFace(){
        this.faces.down.style.setProperty("--offset","calc(var(--halfheight) - var(--halfdepth))")
        Object.assign(this.faces.down.style,{
            "height": "var(--depth)",
            "transform": `translatey(calc(calc(var(--halfheight) - var(--offset)) * -1))
      rotatex(90deg)`
        })
    }

    
    setFrontFace(){
        Object.assign(this.faces.front.style,{
            transform: `translatez(calc(var(--halfdepth) * -1))`
        })
    }

    setBackFace(){
        Object.assign(this.faces.back.style,{
            transform: `translatez(var(--halfdepth))`
        })
    }

    setLeftFace(){
        this.faces.left.style.setProperty("--offset","calc(var(--halfwidth) - var(--halfdepth))")
        Object.assign(this.faces.left.style,{
            "width": "var(--depth)",
            "transform": `translatex(calc(calc(var(--width) / 2) + var(--offset)))
            rotatey(90deg)`
        })
    }

    setRightFace(){
        this.faces.right.style.setProperty("--offset","calc(var(--halfwidth) - var(--halfdepth))")
        Object.assign(this.faces.right.style,{
            "width": "var(--depth)",
            "transform": `translatex(calc(calc(var(--halfwidth) - var(--offset)) * -1))
      rotatey(90deg)`
        })
    }

    setupEachFaceStyle(){
        this.setLeftFace()
        this.setRightFace()
        this.setTopFace()
        this.setDownFace()
        this.setFrontFace()
        this.setBackFace()
    }
    setupFace(){
        this.createInitialFaces()
        this.setupFacesStyle()
        this.setupEachFaceStyle()
    }

}

window.customElements.define("d-box",Box)

// let x = new Box("mesh")
// document.body.appendChild(x)