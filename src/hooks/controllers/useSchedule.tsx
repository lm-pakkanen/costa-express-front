import { useEffect, useState } from 'react';
import papa from 'papaparse';

import { CError } from '../../models/Errors';

interface IScheduleDataRow {
	startCountry: string,
	endCountry: string,
	startTime: string,
	endTime: string
}


const useSchedule = () => {

	const [error, setError] = useState<null | CError>(null);

	const [startCountries, setStartCountries] = useState<null | string[]>([]);
	const [endCountries, setEndCountries] = useState<null | string[]>([]);
	const [startTimes, setStartTimes] = useState<null | string[]>([]);
	const [endTimes, setEndTimes] = useState<null | string[]>([]);


	const getScheduleData = async () => {

		const getCSVData = async () => {

			try {

				const fileContents = await fetch('/assets/Schedule.csv');

				if (!fileContents.body) {
					return setError(new CError('No data was found for Schedule', 404, false));
				}

				const reader = fileContents.body.getReader();
				const readResult = await reader.read();

				const decoder = new TextDecoder('utf-8');

				return decoder.decode(readResult.value);

			} catch (err) {
				return setError(new CError(err.message, err.code, false));
			}

		};

		const csvData = await getCSVData();

		if (!csvData) {
			return setError(new CError('No data was found for Schedule', 404, false));
		}

		const parsedData = papa.parse(csvData, { header: true });

		if (parsedData.errors.length !== 0) {

			const err = parsedData.errors[0];

			const errMessage = err.message;
			const errCode = parseInt(err.code);

			return setError(new CError(errMessage, errCode,false));

		}

		if (!parsedData.data) {
			return setError(new CError('No data was found for Schedule', 404,false));
		}

		return parsedData.data;

	};

	useEffect(() => {

		getScheduleData().then((data) => {

			if (!data || error) {
				return;
			}

			const _startCountries = [];
			const _endCountries = [];
			const _startTimes = [];
			const _endTimes = [];

			for (let _row of data) {

				const row = _row as IScheduleDataRow;

				_startCountries.push(row.startCountry);
				_endCountries.push(row.endCountry);
				_startTimes.push(row.startTime);
				_endTimes.push(row.endTime);

			}

			setStartCountries(_startCountries);
			setEndCountries(_endCountries);
			setStartTimes(_startTimes);
			setEndTimes(_endTimes);

		});

	}, [ error ]);

	return {
		data: {
			startCountries,
			endCountries,
			startTimes,
			endTimes
		}
	};

}

export default useSchedule;