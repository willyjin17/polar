'use client'

import { useBackofficeBadgeAction } from '@/hooks/queries'
import { schemas } from '@polar-sh/client'
import { useState } from 'react'

const Badge = () => {
  const [orgSlug, setOrgSlug] = useState('')
  const [repoSlug, setRepoSlug] = useState('')
  const [issueNumber, setIssueNumber] = useState(0)
  const [action, setAction] = useState<'embed' | 'remove'>('embed')
  const [successURL, setSuccessURL] = useState('')

  const manageBadgeMutation = useBackofficeBadgeAction()

  const generateGitHubURL = (badge: schemas['BackofficeBadgeResponse']) => {
    return `https://github.com/${badge.org_slug}/${badge.repo_slug}/issues/${badge.issue_number}`
  }

  const onSubmit = async () => {
    const { data } = await manageBadgeMutation.mutateAsync({
      org_slug: orgSlug,
      repo_slug: repoSlug,
      issue_number: issueNumber,
      action: action,
    })

    if (data) {
      setSuccessURL(generateGitHubURL(data))
    }
  }

  return (
    <>
      {successURL && (
        <div className="bg-green-200 px-4 py-2">
          <strong>Success!</strong>{' '}
          <a href={successURL} target="_blank" rel="noopener noreferrer">
            {successURL}
          </a>
        </div>
      )}
      <form>
        <div className="mt-4">
          <label htmlFor="org-slug" className="block">
            Org Slug
          </label>
          <input
            type="text"
            id="org-slug"
            onChange={(e) => {
              setOrgSlug(e.target.value)
            }}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="repo-slug" className="block">
            Repo Slug
          </label>
          <input
            type="text"
            id="repo-slug"
            onChange={(e) => {
              setRepoSlug(e.target.value)
            }}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="issue-number" className="block">
            Issue Number
          </label>
          <input
            type="text"
            id="issue-number"
            onChange={(e) => {
              setIssueNumber(parseInt(e.target.value))
            }}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="action" className="block">
            Action
          </label>
          <select
            id="action"
            onChange={(e) => setAction(e.target.value as 'embed' | 'remove')}
            value={action}
          >
            <option value={'embed'}>Embed</option>
            <option value={'remove'}>Remove</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 bg-black p-4 text-white"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onSubmit()
          }}
        >
          {action == 'embed' ? 'Embed' : 'Remove'} Badge
        </button>
      </form>
    </>
  )
}

export default Badge
