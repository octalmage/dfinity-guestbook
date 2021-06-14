import { Actor, HttpAgent } from "@dfinity/agent"
import { idlFactory as counter_idl, canisterId as counter_id } from "dfx-generated/blog"

const agentOptions = {
  host: "http://localhost:8000",
}

const agent = new HttpAgent(agentOptions)
const blog = Actor.createActor(counter_idl, { agent, canisterId: counter_id })

export { blog }