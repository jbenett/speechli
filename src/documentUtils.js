class DocumentManager {
	static storageKey = "savedDocuments";
	static initialValue = [];

	constructor() {
		this._initializeStore();
	}

	_initializeStore() {
		if (window.localStorage.getItem(DocumentManager.storageKey)) {
			return;
		}
		window.localStorage.setItem(
			DocumentManager.storageKey,
			JSON.stringify(DocumentManager.initialValue)
		);
	}

	_setDocuments(documents) {
		window.localStorage.setItem(
			DocumentManager.storageKey,
			JSON.stringify(documents)
		);
	}

	retrieveDocuments() {
		const documents = window.localStorage.getItem(
			DocumentManager.storageKey
		);
		return JSON.parse(documents);
	}

	storeDocument(newDocument) {
		const documents = this.retrieveDocuments();
		this._setDocuments([...documents, newDocument]);
	}
}

export const documentManager = new DocumentManager();
