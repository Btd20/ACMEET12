import { NgModule } from "@angular/core";
import { MeetingRoomComponent } from "./meeting-room.component";
import { CommonModule } from "@angular/common";
import { MeetingRoomRoutingModule } from "./meeting-room-routing.module";
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
    declarations: [MeetingRoomComponent],
    imports: [
        CommonModule,
        MeetingRoomRoutingModule,
        SharedModule
    ],
    exports:[MeetingRoomComponent]
})
export class MeetingRoomModule{}
