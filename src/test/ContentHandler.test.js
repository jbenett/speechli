import ContentHandler from '../ContentHandler.js'

describe('ContentHandler', () => {
  it('Should split input text by periods and insert them as keys into obj.sentences with values obj.SentenceState.NEW', () => {
  	const testText = "Sentence one. Sentence two";
  	const handler = new ContentHandler(testText);
		expect(handler.sentences["Sentence one"]).toEqual(handler.SentenceState.NEW);
		expect(handler.sentences["Sentence two"]).toEqual(handler.SentenceState.NEW);
  });
  it('Should mark a sentence as DONE', () => {
  	const testText = "Sentence one. Sentence two";
		const handler = new ContentHandler(testText);
		handler.markSentenceAsDone("Sentence one");
		expect(handler.sentences["Sentence one"]).toEqual(handler.SentenceState.DONE);
		expect(handler.sentences["Sentence two"]).toEqual(handler.SentenceState.NEW);
  });
  it('Should maintain sentence state on recreation', () => {
  	const testText = "Sentence one. Sentence two";
		const handler = new ContentHandler(testText);
		handler.markSentenceAsDone("Sentence one");
		const newHandler = new ContentHandler(testText, handler.sentences, handler.suggestions);
		expect(newHandler.sentences["Sentence one"]).toEqual(newHandler.SentenceState.DONE);
		expect(newHandler.sentences["Sentence two"]).toEqual(newHandler.SentenceState.NEW);
  });
  it('Should remove stale sentences on text change and recreation', () => {
  	const testText = "Sentence one. Sentence two";
		const handler = new ContentHandler(testText);
  	const modifiedTestText = "Sentence one. Not the same sentence two";
		const newHandler = new ContentHandler(modifiedTestText, handler.sentences, handler.suggestions);
		expect(newHandler.sentences["Sentence one"]).toEqual(newHandler.SentenceState.NEW);
		expect(newHandler.sentences["Sentence two"]).toEqual(undefined);
		expect(newHandler.sentences["Not the same sentence two"]).toEqual(newHandler.SentenceState.NEW);
  });
  it('Should query and produce placeholder suggestions', () => {
  	const testText = "Sentence one. Sentence two";
		const handler = new ContentHandler(testText);
		handler.query();
		handler.suggestions.forEach(({ id, source, text, image, url }) => {
			expect(id).toExist();
			expect(image).toExist();
			expect(source).toExist();
			expect(author).toEqual("anonymous");
			expect(text).toEqual("placeholder text since the query didnt work");
		});
  });
});
