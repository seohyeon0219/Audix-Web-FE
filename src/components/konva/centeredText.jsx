import React, { useRef, useEffect } from 'react';
import { Text } from 'react-konva';

const CenteredText = (props) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const width = textRef.current.width();
      const height = textRef.current.height();
      textRef.current.offsetX(width / 2);
      textRef.current.offsetY(height / 2);
    }
  }, [props.text]);

  return <Text ref={textRef} {...props} />;
};

export default CenteredText;