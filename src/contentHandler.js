export default class ContentHandler {
	// object shape:
	// {
	// 	SentenceState: { enums },
	// 	sentences: { string: SentenceState value },
	// 	suggestions: [
	// 		{
	// 			id: string,
	// 			source: string, 
	// 			text: string, 
	// 			author: string,
	// 			image: url
	// 		}
	// 	]
	// }

	constructor(text="", oldSentences={}, oldSuggestions=[]){
		this.SentenceState = {
			NEW: 1,
			QUERYING: 2,
			DONE: 3,
		};
		this.sentences = {};
		this.suggestions = [];

		text.split(".").forEach((sentence) => {
			var cleanedSentence = sentence.toLowerCase().trim();
			if (cleanedSentence) {
				this.sentences[cleanedSentence] = oldSentences[cleanedSentence] || this.SentenceState.NEW;
			}
		});

		oldSuggestions.forEach((suggestion) => {
			if (suggestion.source && this.sentences[suggestion.source]) {
				this.suggestions.push({ ...suggestion });
			}
		});
	}

	query = (setStateCallback) => {
		for (var sentence of Object.keys(this.sentences)) {
			if (this.sentences[sentence] == this.SentenceState.NEW) {
				setTimeout(function() {
					setStateCallback(sentence, [
						{
							id: Math.random().toString(36).substring(2), 
							source: sentence,
							text: "new sentence",
							author: "test author",
							image: "not a url"
						}
					]);
				}, 1000);
			}
		}
	}

}