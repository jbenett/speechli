import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import styled from "styled-components";
import DocumentManager from "./DocumentManager";

const SupportButton = styled(Button)`
    position: absolute;
    bottom: 15px;
    left: 15px;
    width: 190px;
`;

const ManageDocumentButton = styled(Button)`
    position: absolute;
    bottom: 15px;
    width: 190px;
    left: 220px;
`;

const SaveDocumentButton = styled(Button)`
    position: absolute;
    bottom: 15px;
    left: 425px;
`;

const ModalWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
`;

const ModalContent = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: white;
    z-index: 1;
    width: 100%;
    padding: 2rem;
    max-width: 600px;
    -webkit-box-shadow: 0px 0px 23px -1px rgba(35, 35, 35, 0.35);
    -moz-box-shadow: 0px 0px 23px -1px rgba(35, 35, 35, 0.35);
    box-shadow: 0px 0px 23px -1px rgba(35, 35, 35, 0.35);
    border-radius: 3px;
`;

const ModalOverlay = styled.div`
    background-color: rgba(255, 255, 255, 0.75);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
`;

class Footer extends Component {
    static propTypes = {
        onChangeDocument: PropTypes.func,
        onSaveDocument: PropTypes.func
    };

    state = {
        showDocuments: false
    };

    _onChangeDocument = doc => {
        const { onChangeDocument } = this.props;
        onChangeDocument(doc);
        this.setState({ showDocuments: false });
    };

    render() {
        const { showDocuments } = this.state;
        const { onSaveDocument } = this.props;

        return (
            <div>
                <SupportButton>🤑&nbsp;Support The Boys&nbsp;🤑</SupportButton>
                <ManageDocumentButton
                    onClick={() =>
                        this.setState({ showDocuments: !showDocuments })
                    }
                >
                    📝&nbsp;Manage Documents
                </ManageDocumentButton>
                <SaveDocumentButton onClick={onSaveDocument}>
                    💾&nbsp;Save Document
                </SaveDocumentButton>
                {showDocuments && (
                    <ModalWrapper>
                        <ModalOverlay />
                        <ModalContent>
                            <h3>Saved Documents</h3>
                            <DocumentManager
                                onChangeDocument={this._onChangeDocument}
                            />
                        </ModalContent>
                    </ModalWrapper>
                )}
            </div>
        );
    }
}

export default Footer;
