import React, { Component } from "react";
import DocumnentItem from "./DocumentItem";
import { documentManager } from "../documentUtils";

export default class DocumentManager extends Component {
	state = {
		documents: documentManager.retrieveDocuments()
	};

	render() {
		const { documents } = this.state;

		return (
			<div>
				{[
					...documents,
					...documents,
					...documents,
					...documents,
					...documents
				].map((doc, i) => (
					<DocumnentItem key={i} {...doc} />
				))}
			</div>
		);
	}
}
