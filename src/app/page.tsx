import Image from "next/image"
import mchammerGIF from "@root/public/images/mchammer.gif"
import drudgesiren from "@root/public/images/drudgesiren.gif"

export default function Home() {

  function MCHammer() {
    return (
      <Image height={50} className="flex" src={mchammerGIF} alt="MC" />
    )
  }

  function Siren() {
    return (
      <Image height={50} className="flex" src={drudgesiren} alt="MC" />
    )
  }

  return (
    <div className="flex flex-col items-center h-full">
      <h1 className="text-3xl font-bold flex">Welcome to Fable Frame!</h1>
      <h4 className="flex">Fable Frame - is a WIP prototype of digital Character Sheets for Tabletop RPGs (TTRPG)</h4>

      <div className="flex flex-col items-center mt-10">
        <h3 className="flex items-center text-2xl font-bold mr-5 text-red-400"><Siren />The problem<Siren /></h3>
        <p>I am a gamemaster for 10+ years. During all that time I&lsquo;ve collected tons of paper sheets with characters on them. I&lsquo;ve tried various software (OneDrive, DnD Beyond, Orcpub, FoundryVTT, etc.) to handle character storage for me and found out that it&lsquo;s almost impossible to use them on a *Mobile Device*.</p>
      </div>

      <div className="flex flex-col items-center mt-10">
        <h3 className="flex text-2xl items-center font-bold mr-5 text-blue-400"><MCHammer />The solution<MCHammer /></h3>
        <p>Create Free and OpenSource platform for Character Sheet storage for different Game Systems where the community can add new Systems, Themes and modules.</p>
      </div>

    </div>
  )
}
