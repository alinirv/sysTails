class Campaign {

    constructor(name, description = '', sheets = [], masterName) {
        this.name = name;
        this.description = description;
        this.sheets = sheets;
        this.masterName = masterName; 

    
    }
}

export default Campaign;