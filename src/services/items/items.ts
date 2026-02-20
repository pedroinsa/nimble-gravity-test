export async function getItems() {

    try {
        let response = await fetch("https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api/jobs/get-list")

        if (!response.ok) {
            throw Error(`Status error: ${response.status}`)
        }
        let items = await response.json()
        return items
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Fetching failed: ${error.message}`)
        }
    }
}


export async function ApplyJob(repoUrl: string, jobId: string) {
    try {
        let response = await fetch("https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api/candidate/apply-to-job", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({
                uuid: import.meta.env.VITE_UUID,
                candidateId: import.meta.env.VITE_CANDIDATEID,
                repoUrl: repoUrl,
                jobId: jobId,
                applicationId: import.meta.env.VITE_APPLICATIONID
            })
        })

        if (!response.ok) {
            throw Error(`Status error: ${response.status}, detail: ${response.json}`)

        }
        return response.json()

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Submit error: ${error.message}`)
        }


    }

}