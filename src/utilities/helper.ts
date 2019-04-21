export const tagOptionsGig = [
	{
		text: 'Contract',
		value: 'Contract',
		label: { color: 'blue', empty: true, circular: true },
	},
	{
		text: 'Permanent',
		value: 'Permanent',
		label: { color: 'red', empty: true, circular: true },
	},
	{
		text: 'Clear',
		value: 'Clear',
		icon: "eraser",
	}
];

export const tagOptionsExperience = [
	{
		text: 'Less than 1 year (or student)',
		value: 'Less than 1 year (or student)',
		label: { color: 'red', empty: true, circular: true },
	},
	{
		text: '1-2 years',
		value: '1-2 years',
		label: { color: 'orange', empty: true, circular: true },
	},
	{
		text: '3-5 years',
		value: '3-5 years',
		label: { color: 'yellow', empty: true, circular: true },
	},
	{
		text: '6-10 years',
		value: '6-10 years',
		label: { color: 'olive', empty: true, circular: true },
	},
	{
		text: 'More than 10 years',
		value: 'More than 10 years',
		label: { color: 'green', empty: true, circular: true },
	},
	{
		text: 'Clear',
		value: 'Clear',
		icon: "eraser",
	}
];

export const tagOptionsSortTalent = [
	{
		value: 'Most Relevant',
		activeState: "_score",
		direction: 'desc'
	},
	{
		value: 'Most Recent',
		activeState: "modified",
		direction: 'desc'
	},
	{
		value: 'Ending Soonest',
		activeState: "expiresOn",
		direction: 'desc'
	}
];

export const tagOptionsSortEmployer = [
	{
		value: 'Most Relevant',
		activeState: "_score",
		direction: 'desc'
	},
	{
		value: 'Most Recent',
		activeState: "modified",
		direction: 'desc'
	},
	{
		value: 'Ending Soonest',
		activeState: "expiresOn",
		direction: 'desc'
	},
	{
		value: 'Lowest to Highest',
		activeState: "minimumBid",
		direction: 'asc'
	},
	{
		value: 'Highest to Lowest',
		activeState: "minimumBid",
		direction: 'desc'
	}
];

export const sortingOptionsGigs = [
	{
		value: 'Draft',
		activeState: 1,
	},
	{
		value: 'Published',
		activeState: 2,
	},
	{
		value: 'Deleted',
		activeState: 3,
	},
	{
		value: 'Expired',
		activeState: 4,
	},
	{
		value: 'Closed',
		activeState: 5,
	}
];

export const setButtonColor = (exp: any) => {
	switch (exp) {
    case '1-2 years':
      return 'orange';
    case '3-5 years':
			return 'yellow';
		case '6-10 years':
      return 'olive';
    default:
			return 'orange';
	}
};

export const getErrorMessageFromCode = (code: string) => {
	switch (code) {
    case 'SE':
      return 'Internal server error';
    case 'SDBE':
			return 'Internal server error';
		case 'CPDNTE':
			return 'Account does not exist';
		case 'CRDNTE':
      return 'Requested resource does not exist';
    case 'CAAE':
			return 'Account already exist';
		case 'CBUP':
			return 'Either username does not exist or password is wrong';
		case 'CULO':
			return 'Account is locked out';
		case 'CUNC':
			return 'Account is not confirmed';
		case 'CBED':
			return "Sorry, we don't allow disposable email addresses. There is no escaping our spam!";
    default:
			return 'unknown error';
	}
};

export const addKeyForDropDown = (data: any) => {
	Object.keys(data).map((key: any) => {
		data[key].map((obj: any, index: number) => {
			data[key][index]['key'] = obj.id;
			data[key][index]['text'] = obj.title;
			data[key][index]['value'] = obj.title;
		});
	});
	return data;
};

export const addSkillKeyForDropDown = (data: any) => {
	data.map((obj: any) => {
		obj['key'] = obj.skillId;
		obj['text'] = obj.skillName;
		obj['value'] = obj.skillName;
		obj['label'] = obj.skillName;
		obj['title'] = obj.skillName;
	});
	return data;
};

export const removeEmpty = (obj: any) => {
	Object.keys(obj).map((key: any) => {
		if (obj[key] === null || obj[key] === '') delete obj[key];
	});
	return obj;
};

export function extract_marquee(IMAGE_CODE: string = '', object: any) {
  let ret: any = [];
  object.length ? object.map((e: any) => {
    if (e.albumTypeCode === IMAGE_CODE) {
			e.pictures ? Array.isArray(e.pictures.picture) ? e.pictures.picture.length ? e.pictures.picture.map((p: any, i: number) => {
        ret.push ({
          url: `https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/${p.filename}?v=131853598667494000`,
          pictureId: p.pictureId,
					albumId: p.albumId
        });
      }) : null : ret.push ({
				url: `https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/${e.pictures.picture.filename}?v=131853598667494000`,
				pictureId: e.pictures.picture.pictureId,
				albumId: e.pictures.picture.albumId
			}) : null;
    }
  }) : null;
  return ret;
}

export function extract_images(IMAGE_CODE: string = '', object: any) {
  let ret: any = [];
  object.length ? object.map((e: any) => {
    if (e.albumTypeCode === IMAGE_CODE) {
      e.pictures ? Array.isArray(e.pictures.picture) ? e.pictures && e.pictures.picture.length ? e.pictures.picture.map((p: any, i: number) => {
        ret.push ({
          url: `https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/${p.filename}?v=131853598667494000`,
          pictureId: p.pictureId,
					albumId: p.albumId
        });
			}) : null : ret.push ({
				url: `https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/${e.pictures.picture.filename}?v=131853598667494000`,
				pictureId: e.pictures.picture.pictureId,
				albumId: e.pictures.picture.albumId
			}) : null;
    }
  }) : null;
  return ret;
}

export function extract_people(IMAGE_CODE: string = '', obj: []= []) {
  let ret: any = [];
  obj.length ? obj.map((e: any) => {
    if (e.albumTypeCode === IMAGE_CODE) {
      e.pictures ? Array.isArray(e.pictures.picture) ? e.pictures && e.pictures.picture.length ? e.pictures.picture.map((p: any, i: number) => {
        ret.push ({
          url: `https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/small-${p.filename}?v=131853598667494000`,
          description: p.description,
					title: p.title,
					pictureId: p.pictureId,
					albumId: p.albumId
        });
      }) : null : ret.push ({
				url: `https://s3.amazonaws.com/dev.content.skillgigs.com/NodeJS/small-${e.pictures.picture.filename}?v=131853598667494000`,
				description: e.pictures.picture.description,
				title: e.pictures.picture.title,
				pictureId: e.pictures.picture.pictureId,
				albumId: e.pictures.picture.albumId
			}): null;
    }
  }) : null;
  return ret;
}