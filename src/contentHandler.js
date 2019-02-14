import axios from 'axios';

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
			if (this.sentences[suggestion.source]) {
				this.suggestions.push({ ...suggestion });
			}
		});
	}

	markSentenceAsDone = (sentence) => {
		if (sentence in this.sentences) {
			this.sentences[sentence] = this.SentenceState.DONE;
		}
	};

	removeSuggestionById = (id) => {
		this.suggestions = this.suggestions.filter((sug) => sug.id != id);
	};

	removeSuggestionBySource = (source) => {
		this.suggestions = this.suggestions.filter((sug) => sug.source != source);
	};

	query = (setStateCallback) => {
		for (let sentence of Object.keys(this.sentences)) {
			if (this.sentences[sentence] == this.SentenceState.NEW) {
				const url='http://127.0.0.1:5000/discovery/suggest/'; // TODO this'll need to change 
				axios.post(url, { sentence }).then(function (response) {
					setStateCallback(sentence, response.data.map((sug) => {
							return {
								id: Math.random().toString(36).substring(2), 
								source: sentence,
								text: sug.text,
								author: sug.author || 'anonymous',
								image: sug.image || 'not a url'
							};
						})
					);
				}).catch(function (error) {
					console.log(error);
					setStateCallback(sentence, [
						{
							id: Math.random().toString(36).substring(2), 
							source: sentence,
							text: "placeholder text since the query didnt work",
							author: "anonymous",
							image: "not a url"
						}
					]);
				});
			}
		}
	}

}