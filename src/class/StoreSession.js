let store = {
	
}

export default class StoreSession {
	static setStore(name, value) {
		store[name] = value
	}
	static unsetStore(name) {
		delete store[name]
	}
	static getStore(name) {
		return store[name]
	}
	static gets() {
		return store;
	}
}