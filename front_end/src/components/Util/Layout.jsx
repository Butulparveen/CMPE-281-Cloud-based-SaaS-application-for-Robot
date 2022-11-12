
import { Navbar } from "./navbar";
import BodyWrapper from "./BodyWrapper";

export const Sidebar = ({ children }) => {
    console.log("Height", window.innerHeight)
    return (
        <BodyWrapper>
            <div className="flex h-screen bg-gray-300">
                <Navbar />

                <div className="flex flex-col flex-1 overflow-auto" >
                    <main className="content">
                        <section className="sm:flex-row flex flex-col flex-1">
                            <div
                                className="content-box"
                                style={{ flexGrow: 2,flexBasis: "0%",width: "17%", backgroundColor: "#fff5f5;"}}
                            >
                                {children}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </BodyWrapper>
    );
};