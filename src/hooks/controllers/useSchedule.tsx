import { useEffect, useState } from 'react';
import papa from 'papaparse';

import { CError } from '../../models/Errors';

interface IScheduleDataRow {
	startCountry: string,
	endCountry: string,
	startTime: string,
	hasSpaceAvailable: string
}


const useSchedule = () => {

	// TODO: Throw error
	const [error, setError] = useState<null | CError>(null);

	const [scheduleData, setScheduleData] = useState<IScheduleDataRow[]>([]);

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

		const parsedData = papa.parse(csvData, { header: true, skipEmptyLines: true });

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

		getScheduleData().then((_data) => {

			const data: IScheduleDataRow[] = [];

			if (!_data) {
				return;
			}

			for (let _row of _data) {

				const row = _row as IScheduleDataRow;

				const rowData = {
					startCountry: row.startCountry,
					endCountry: row.endCountry,
					startTime: row.startTime,
					hasSpaceAvailable: JSON.parse(row.hasSpaceAvailable.toLowerCase())
				};

				data.push(rowData);
			}

			setScheduleData(data);

		});

	}, []);

	return scheduleData;

}

export default useSchedule;