const storage = {
    isJSON(template) {
        if (typeof template !== "string")
            return false
        try {
            JSON.parse(template)
            return true
        } catch (error) {
            return false
        }
    },
    get(key) {
        try {
            const storageData = localStorage.getItem(key)
            if (!this.isJSON(storageData))
                return storageData
            else return JSON.parse(storageData)

        } catch (error) {

        }
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    remove(key) {
        localStorage.removeItem(key)
    }
}

export default storage