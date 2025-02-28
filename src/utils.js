/**
 * Updates block attributes only if they differ from their preset values.
 * If a value matches its preset, the attribute is set to `undefined` to remove it.
 * This ensures only user-modified values are stored, keeping the block attributes clean.
 *
 * @param {Object}   newValues     An object containing the new attribute values.
 * @param {Object}   presetValues  An object containing the preset/default values.
 * @param {Function} setAttributes The WordPress setAttributes function.
 * @param {Object}   attributes    The current block attributes.
 */
export function updateAttribute(newValues, presetValues, setAttributes, attributes) {
	const updatedAttributes = { ...attributes };

	Object.entries(newValues).forEach(([key, value]) => {
		const presetValue = presetValues[key];
		if (value === presetValue) {
			value = undefined; // Remove the attribute if it matches the preset value.
		}
		updatedAttributes[key] = value;
	});

	setAttributes(updatedAttributes);
}
