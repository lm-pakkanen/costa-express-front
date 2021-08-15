import { useEffect, useState } from 'react';
import papa from 'papaparse';

import { CError } from '../../models/Errors';
import useMemoryController, { IUSeMemoryController } from './useMemoryController';
import constants from '../../config/constants';

interface IScheduleDataRow {
	startCountry: string,
	endCountry: string,
	startTime: string,
	hasSpaceAvailable: string
}

const useSchedule = (): IScheduleDataRow[] => {

	const [scheduleData, setScheduleData] = useState<IScheduleDataRow[]>([]);

	const memoryController = useMemoryController();

	const getScheduleData = async (memoryController: IUSeMemoryController) => {

		const getCSVData = async () => {

			try {

				const fileContents = await fetch(`${constants.BASE_URI}/assets/Schedule.csv`);

				if (!fileContents.body) {
					const error = new CError('No data was found for Schedule', 404, false);
					memoryController.addMemoryError(error);
					return;
				}

				const reader = fileContents.body.getReader();
				const readResult = await reader.read();

				const decoder = new TextDecoder('utf-8');

				return decoder.decode(readResult.value);

			} catch (err) {
				memoryController.addMemoryError(new CError(err.message, err.code, false));
				return;
			}

		};

		const csvData = await getCSVData();

		if (!csvData) {
			memoryController.addMemoryError(new CError('No data was found for Schedule', 404, false));
			return;
		}

		const parsedData = papa.parse(csvData, { header: true, skipEmptyLines: true });

		if (parsedData.errors.length !== 0) {

			const err = parsedData.errors[0];

			const errMessage = err.message;
			const errCode = parseInt(err.code);

			memoryController.addMemoryError(new CError(errMessage, errCode,false));
			return;


		}

		if (!parsedData.data) {
			const error = new CError('No data was found for Schedule', 404,false);
			memoryController.addMemoryError(error);
			return;
		}

		return parsedData.data;

	};

	useEffect(() => {

		getScheduleData(memoryController).then((_data) => {

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
					hasSpaceAvailable: row.hasSpaceAvailable.toLowerCase()
				};

				data.push(rowData);
			}

			setScheduleData(data);

		});

	}, []);

	return scheduleData;

}

export default useSchedule;