export default class Filter {
	static toString(filter) {
		let formatedFilter = "";

		if (filter.allUsers)
			formatedFilter = "Todos los usuarios.";
		else {
			const arrFormatedFilter = [filter.type.name];

			if (filter.position !== null)
				arrFormatedFilter.push(filter.position.name);

			if (filter.chain !== null)
				arrFormatedFilter.push(filter.chain.name);

			if (filter.city !== null)
				arrFormatedFilter.push(filter.city.name);

			if (filter.gender !== null) {
				if (filter.gender)
					arrFormatedFilter.push("Mujer");
				else
					arrFormatedFilter.push("Hombre");
			}

			if (filter.initAge !== null)
				arrFormatedFilter.push(`${filter.initAge} - ${filter.finalAge} años`)

			// if (filter.role !== null) {
			// 	arrFormatedFilter.push(filter.role.name);
			// }

			formatedFilter = arrFormatedFilter.join(", ");
		}

		return formatedFilter;
	}
};