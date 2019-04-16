import React, { Component } from "react";
import PropTypes from "prop-types";
import DocumnentItem from "./DocumentItem";
import { documentManager } from "../documentUtils";

const divStyle = {
	overflow: 'auto',
	maxHeight:'30rem',
};

export default class DocumentManager extends Component {


	static propTypes = {
		onChangeDocument: PropTypes.func
	};

	state = {
		documents: documentManager.retrieveDocuments()
	};

	render() {
		const { documents } = this.state;
		const { onChangeDocument } = this.props;

		return (
			<div style = {divStyle}>
				{documents.map((doc, i) => (
					<DocumnentItem
						key={i}
						{...doc}
						onClick={() => onChangeDocument(doc)}
					/>
				))}
			</div>
		);
	}
}
