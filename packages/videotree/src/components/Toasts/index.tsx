import { FC, useState, useEffect } from "react";
import styled from "styled-components";

const ProgressToastWrap = styled.div`
  position: relative;
  font-family: var(--font-sans-serif);
  h6 {
    font-weight: bold;
    color: var(--body-color);
    margin-bottom: 0.3rem;
  }
  .progress {
    height: 0.5rem;
  }
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  p {
    display: flex;
    align-items: center;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
    a {
      color: var(--primary) !important;
      font-weight: 600;
    }
    svg {
      color: var(--bg-500);
      font-size: 0.6rem;
      margin: 0 0.3rem;
    }
  }
`;

export const ProgressToast: FC<any> = ({ fileName, toastProps }) => {
  const [name, setName] = useState<string>(fileName);

  useEffect(() => {
    if (fileName.length > 10) {
      try {
        const shortenName = fileName.split(".")[0].slice(0, 16);
        const extension = fileName.split(".")[1];

        setName(`${shortenName}...(.${extension})`);
      } catch (e: any) {
        console.log("Error shortening fileName", {
          e,
        });
      }
    }
  }, []);

  return (
    <ProgressToastWrap>
      <h6>Uploading Files</h6>
      <p>
        <span>{Number((toastProps.progress * 100)?.toFixed(0))}%</span>
        {/* <VscCircleFilled /> */}
        <span style={{ flex: 1, width: 0 }}>{name}</span>
      </p>
      {/* <ProgressBar now={toastProps.progress * 100} /> */}
    </ProgressToastWrap>
  );
};

export const FileErrorToast: FC<any> = ({ message, onClick }) => {
  return (
    <ProgressToastWrap onClick={onClick}>
      <h6>Error Uploading File</h6>
      {message ? (
        <p dangerouslySetInnerHTML={{ __html: message }} />
      ) : (
        <p>This file seems to be corrupted or not supported.</p>
      )}
    </ProgressToastWrap>
  );
};
