
class Mesh extends HTMLElement{
    constructor(className){
        super()
        this.root = this.attachShadow({mode:"closed"})
        this.className = className
        this.setup()
    }

    getAttrValue(attr,defaultValue){
        return this.hasAttribute(attr) ? this.getAttribute(attr) : defaultValue
    }


    reRender(){
        this.computeHalfProperty()
        this.__setCssPropertyObj(this.__transformProperty)   
    }
    createProperty(){
        this.__transformProperty = {
            rotatex:[this.getAttrValue("rotatex",0),"deg"],
            rotatey:[this.getAttrValue("rotatey",0),"deg"],
            rotatez:[this.getAttrValue("rotatez",0),"deg"],
            width:[this.getAttrValue("width",100),"px"],
            height:[this.getAttrValue("height",100),"px"],
            depth:[this.getAttrValue("depth",100),"px"]
        }
        this.computeHalfProperty()
    }
    computeHalfProperty(){
        let halfObj = {
            halfwidth:[this.__transformProperty.width[0] / 2,"px"],
            halfheight:[this.__transformProperty.height[0] / 2,"px"],
            halfdepth:[this.__transformProperty.depth[0] / 2,"px"]
        }
        Object.assign(this.__transformProperty, halfObj)

    }

    setProperty(obj){
        Object.assign(this.__transformProperty, obj)
        this.__setCssPropertyObj()
    }

    setup(){
        this.mainElt = document.createElement("div")
        this.mainElt.className = this.className
        this.createProperty()
        this.setupCss()
        this.root.appendChild(this.mainElt)

    }



    setupCss(){
        this.setupCssVariable()
        Object.assign(this.mainElt.style,{
            transformStyle: "preserve-3d",
            transform: `rotatex(var(--rotatex)) rotatey(var(--rotatey))
            rotatez(var(--rotatez))`,
            width: "var(--width)",
            height: "var(--height)"

        })
    }

    __setCssProperty(prop, value){
        this.mainElt.style.setProperty(`--${prop}`,value)
    }

    __setCssPropertyObj(obj){
        for (const key in obj){
            let value,unit;
            [value, unit] = obj[key]
            this.__setCssProperty(key, value+unit)
        }
    }
    setWidth(value){
        this.__setCssProperty("width",value + "px")
        this.__setCssProperty("halfwidth",(value / 2) + "px")
    }

    setHeight(value){
        this.__setCssProperty("height",value + "px")
        this.__setCssProperty("halfheight",(value / 2) + "px")
    }
    setDepth(value){
        this.__setCssProperty("depth",value + "px")
        this.__setCssProperty("halfdepth",(value / 2) + "px")        
    }
    setupCssVariable(){
        let obj = this.__transformProperty
        this.__setCssPropertyObj(obj)
    }

    addChild(child){
        this.mainElt.appendChild(child)
    }

}

window.customElements.define("d-mesh",Mesh)



