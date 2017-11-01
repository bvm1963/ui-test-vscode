export interface IMainMenu {
	Id: number;
	ParentID: number;
	MenuName: string;
	MenuCaption: string;
	PageRoute: string;
	Icon: string;
	MainMenuID?: number;
	Click?: any;
	ItemTypeInt?: number;
}