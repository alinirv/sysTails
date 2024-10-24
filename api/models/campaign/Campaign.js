class Campaign {
    constructor(name, description, masterName, status = 'OPEN', sheets=[]) {
        this.name = name;
        this.description = description;
        this.masterName = masterName; 
        this.status = status;
        this.sheets = sheets; 
        this.token = this.generateCampaignToken()
    }

    generateCampaignToken() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const length = 5;
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        return result;
      }
}
export default Campaign;