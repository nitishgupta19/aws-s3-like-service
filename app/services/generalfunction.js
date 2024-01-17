import moment from 'moment';

class GeneralFunctionService {
  constructor() {}
  getCurrentTime = () => moment().format('HH:mm:ss');
  getCurrentDateTime = () => moment().format('YYYY-MM-DD HH:mm:ss');

  changeDate = (value) => {
    let dstfmt = 'DD/MM/YYYY';

    if (!value || value === '00/00/0000') return value;
    if (!moment(value).isValid()) return value;
    return moment(value).format(dstfmt);
  };
}

export default new GeneralFunctionService();
