/* eslint-disable react/prop-types */

const BoxText = ({ isTranslated, onChangeText, text }) => {
  return (
    <div className="w-full mt-2">
      <textarea
        onChange={(e) => onChangeText(e.target.value)}
        name=""
        value={text}
        readOnly={!isTranslated}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        role="combobox"
        rows="1"
        spellCheck="false"
        maxLength={500}
        className="h-[120px] w-full bg-transparent text-sm border-none resize-none whitespace-pre-wrap focus:outline-none"
      ></textarea>
      {isTranslated && (
        <div className="w-full flex justify-end">
          <span className=" text-[11px] text-right text-[#394150]">
            {text.length}/500
          </span>
        </div>
      )}
    </div>
  );
};

export default BoxText;
