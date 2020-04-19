import React from "react";
import styled from "styled-components";
import spinnerLoader from "images/spinner-loader.svg";

export const Overlay = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 1001;
	background-color: rgba(255, 255, 255, 0.01);
	text-align: center;

	img {
		margin-top: calc(50vh - 32px);
	}
`;

export const Loader = () => (
	<Overlay>
		<img src={spinnerLoader} alt="loading" />
	</Overlay>
);

export default Loader;
