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
			var cleanedSentence = sentence.trim(); // Got rid of lowercase to be able to perform replace function easier
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

	markAsDone = (sentence) => {
		if (sentence in this.sentences) {
			this.sentences[sentence] = this.SentenceState.DONE;
			this.suggestions = this.suggestions.filter((suggestion) => {
				return suggestion.source != sentence;
			});
		}
	};

	query = (setStateCallback) => {
		for (let sentence of Object.keys(this.sentences)) {
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