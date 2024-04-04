const AccountInput = ({ fieldName, value, editMode, placeholder, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={`${fieldName}Div flex input-container`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        readOnly={!editMode}
        onChange={handleChange}
      />
    </div>
  );
};

export default AccountInput;
