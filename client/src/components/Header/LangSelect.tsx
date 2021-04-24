import React, { useEffect, useState } from "react";
import { SplitButton } from "primereact/splitbutton";

type Props = {};

const LangSelect: React.FC<Props> = ({}) => {
  const items = [
    {
      label: "EN English",
      //   icon: "pi pi-refresh",
      command: () => {},
    },
    {
      label: "RU Русский",
      //   icon: "pi pi-times",
      command: () => {},
    },
  ];

  const selectLang = () => {};

  return (
    <SplitButton
      label="EN"
      icon="pi pi-globe"
      onClick={selectLang}
      model={items}
      className="p-button-secondary"
    ></SplitButton>
  );
};

// export default Editor;
export default LangSelect;
