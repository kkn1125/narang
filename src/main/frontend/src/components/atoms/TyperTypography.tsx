import React, { useEffect, useState } from "react";
import Typer from "../../tools/Typer";

interface TyperTypographyProps {
  textList?: { name: string; value: string | string[] }[];
  children?: string;
}

function TyperTypography({ textList, children }: TyperTypographyProps) {
  const [view, setView] = useState(true);
  const [typer, setTyper] = useState(null);
  const [maps, setMaps] = useState(null);

  useEffect(() => {
    let map: { [index: string]: any[] } = null;
    if (textList) {
      map = textList.reduce((acc, cur) => {
        if (!acc[cur.name as string]) acc[cur.name as string] = [];
        if (typeof cur.value === "string") {
          acc[cur.name as string].push(cur.value);
        } else {
          acc[cur.name as string].push(...cur.value);
        }
        return acc;
      }, {} as { [index: string]: any[] });
      setMaps(map);
    }

    const typers = Typer.init({
      typer: {
        words: {
          ...(children && { base1: [children] }),
          ...(textList && textList.length > 0 && map),
        },
        speed: 0.1,
        delay: 1,
        loop: true,
        loopDelay: 1,
        // start: 0.3,
        eraseMode: true,
        eraseSpeed: 0.1,
        realTyping: true,
        style: {
          cursorBlink: "vertical",
        },
      },
    });
    setTyper(typers);
    return () => {
      setView(false);
    };
  }, []);

  return (
    <>
      {view &&
        (children ? (
          <div data-typer-name='base1' />
        ) : (
          textList.length > 0 &&
          textList.map((text, idx) => (
            <div key={idx} data-typer-name={text.name} />
          ))
        ))}
    </>
  );
}

export default TyperTypography;
