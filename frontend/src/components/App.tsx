import React, { useEffect, useRef } from "react";

import { TileContainer } from "./Tiles/TileContainer/TileContainer";
import Header from "./Header/Header";
import "./App.css";
import ChatContainer from "./Chat/ChatContainer";
import Modal from "./Modals/Modal";
import UIStore from "../stores/UIStore";
import NotificationViewer from "./NotificationViewer";
import msToTime from "../util/msToTime";
import Footer from "./Footer/Footer";
import NotificationService from "../services/NotificationService";
import { NotificationType } from "../enum/NotificationType";

const App: React.FunctionComponent = () => {
    const appRef = useRef<HTMLDivElement>(null);

    const url = new URL(window.location.href);
    const parts = url.pathname.split("/").slice(1);
    const verb: string = parts[0];
    const data: string = parts[1];

    if (verb === "join") {
        if (data) {
            UIStore.store.preFillJoinValue = data;
        }
        UIStore.store.modalStore.join = true;
    }

    if (verb === "create") {
        UIStore.store.modalStore.create = true;
    }

    if (!verb) {
        UIStore.store.modalStore.joinOrCreate = true;
    }
    document.title = UIStore.store.title;

    useEffect(() => {
        setInterval(() => {
            if (UIStore.store.joinedDate) {
                const time = Date.now() - UIStore.store.joinedDate.getTime();
                document.title = `${UIStore.store.title} | ${msToTime(time)}`;
            } else {
                document.title = UIStore.store.title;
            }
        }, 250);
    }, []);

    function toggleFullscreen() {
        if (!appRef.current) {
            return;
        }
        if (document.fullscreenElement) {
            document.exitFullscreen();
            return;
        }
        appRef.current?.requestFullscreen().catch((err: Error) => {
            NotificationService.add(
                NotificationService.createUINotification(
                    "Could not enable fullscreen: " + err.toString(),
                    NotificationType.Error
                )
            );
        });
    }

    return (
        <div ref={appRef} className={"app"}>
            <NotificationViewer />
            <Modal />
            <Header toggleFullscreen={toggleFullscreen} />
            <div className={"main-container"}>
                <ChatContainer />
                <TileContainer />
            </div>
            <Footer />
        </div>
    );
};

export default App;
