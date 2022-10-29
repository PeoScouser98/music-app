import { $, $$ } from "../../utils/common";

export function RadioSelect(name, data) {
	this.value = "Choose";
	this.render = () => {
		return /* html */ `
			<div class="dropdown" id="${name}-select">
				<label tabindex="0" class="custom-select">
					<span id="selected">${this.value}</span>
					<i class="bi bi-caret-down-fill"></i>
				</label>
				<ul tabindex="0" id="genre" class="dropdown-content custom-option" id="genre">
					${data
				.map(
					(item, index) => /* html */ `
								<li>
									<label for="${name}-${index}">
										<input type="radio" name="${name.toLowerCase()}" id="${name}-${index}" class="accent-primary w-4 h-4 ${name}-option" value="${item._id}" />
										${item.name}
									</label>
								</li>
							`,
				)
				.join("")}
					<li>
						<label for="other-${name.toLowerCase()}">
							<input type="radio" name="${name.toLowerCase()}" id="other-${name.toLowerCase()}" class="accent-primary w-4 h-4 ${name}-option" value="Other" />
							Other
						</label>
					</li>
				</ul>
			</div>
		`;
	};

	this.onChange = () => {
		if ($$(`.${name}-option`))
			$$(`.${name}-option`).forEach((input) => {
				input.onchange = () => {
					if (input.checked == true) this.value = input.value;
					$(`#${name}-select`).querySelector("#selected").innerText = input.parentElement.innerText;
				};
			});
	};

	this.reset = () => {
		$(`#${name}-select`).querySelector("#selected").innerText = "Choose";
	};
}

export function CheckboxSelect(name, data) {
	this.value = [];
	this.selections = [];

	this.render = () => {
		return /* html */ `
			<div class="dropdown" id="${name}-select">
				<label tabindex="0" class="custom-select">
					<span id="selected-${name}">Choose</span>
					<i class="bi bi-caret-down-fill"></i>
				</label>
				<ul tabindex="0" class="dropdown-content custom-option" id="artists">
					${data
				.map((item, index) => {
					return /* html */ `
								<li>
									<label for="${name}-${index}">
										<input type="checkbox" class="accent-primary w-4 h-4 ${name}-option" value="${item._id}" id="${name}-${index}" />
										${item.name}
									</label>
								</li>
							`;
				})
				.join("")}
					<li>
						<label for="other-${name}"><input type="checkbox" id="other-${name}" class="accent-primary w-4 h-4 ${name}-option" value="Other" />Other</label>
					</li>
				</ul>
			</div>
		`;
	};
	this.onChange = () => {
		const options = $$(`.${name}-option`);
		if (options)
			options.forEach((input) => {
				input.onchange = () => {
					if (input.checked == true) {
						this.value.push(input.value);
						this.selections.push(input.parentElement.innerText);
					} else {
						this.value = this.value.filter((val) => val != input.value);
						this.selections = this.selections.filter((val) => val != input.parentElement.innerText);
					}
					const selectedOptions = $(`#selected-${name}`);
					if (this.selections.length != 0) selectedOptions.innerText = this.selections.join(", ");
					else selectedOptions.innerText = "Choose";
				};
			});
	};
	this.reset = () => {
		this.selections = "Choose";
		this.render();
	};
}
