import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { randomEmoji } from "../emojiUtils";

const DocumentItemWrapper = styled.div`
	padding: 1rem;
	-webkit-box-shadow: 0px 0px 23px -1px rgba(35, 35, 35, 0.15);
	-moz-box-shadow: 0px 0px 23px -1px rgba(35, 35, 35, 0.15);
	box-shadow: 0px 0px 23px -1px rgba(35, 35, 35, 0.15);
	border-radius: 3px;

	&:hover {
		opacity: 0.65;
		cursor: pointer;
	}

	&:not(:last-of-type) {
		margin-bottom: 0.75rem;
	}
`;

const DocumentItemContentWrapper = styled.div`
	display: flex;
`;

const EmojiTextWrapper = styled.div`
	width: 25px;
	display: flex;
	align-items: center;
	margin-right: 0.5rem;
`;

const EmojiText = styled.p`
	font-size: 1.5rem;
`;

const TextWrapper = styled.div`
	flex: 1 1 0;
`;

const TitleText = styled.p`
	font-weight: bold;
	font-size: 1.25rem;
	margin-bottom: 0;
`;

const BodyText = styled.p`
	font-size: 1rem;
`;

export default class DocumentItem extends Component {
	static propTypes = {
		title: PropTypes.string,
		text: PropTypes.string
	};

	static defaultProps = {
		title: "Unamed Document",
		text: "Nothing amazing yet"
	};

	state = {
		emoji: randomEmoji()
	};

	render() {
		const { emoji } = this.state;
		const { title, text, ...props } = this.props;

		return (
			<DocumentItemWrapper {...props}>
				<DocumentItemContentWrapper>
					<EmojiTextWrapper>
						<EmojiText>{emoji}</EmojiText>
					</EmojiTextWrapper>
					<TextWrapper>
						<TitleText>{title}</TitleText>
						<BodyText>{text}</BodyText>
					</TextWrapper>
				</DocumentItemContentWrapper>
			</DocumentItemWrapper>
		);
	}
}
