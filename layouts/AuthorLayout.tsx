import { ReactNode } from 'react'
import { allBlogs, allWorkHistories, type Authors } from 'contentlayer/generated'
import Image from '@/components/Image'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import Link from 'next/link'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import Tech from '@/components/Tech'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { avatar } = content
  const posts = allCoreContent(sortPosts(allBlogs))
  const workhistories = allWorkHistories

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div>
          <div className="flex flex-col items-center space-x-2 border-2 border-dashed p-1">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={800}
                height={800}
                className="sm:max-md:h-full sm:max-md:w-full"
              />
            )}
          </div>

          <div className="prose dark:prose-invert max-w-none pt-8 xl:col-span-2">
            {children}

            <div className="pt-8">
              <div>
                <h5 className="text-3xl leading-9 font-light tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
                  Career
                </h5>

                <div className="mt-3 font-light text-gray-950">Some work experience</div>
              </div>

              <ul className="list-none p-0">
                {workhistories.map((post, index) => {
                  const { url, role, date, company, body, tech } = post
                  return (
                    <li
                      key={company}
                      className={`${index !== workhistories.length - 1 && 'border-b-1'} py-4 pt-0`}
                    >
                      <article className="flex flex-col space-y-2 xl:space-y-0">
                        <div className="flex justify-between">
                          <div>
                            <h5 className="text-m font-bold">{role}</h5>
                            <Link href={url} target="_blank" rel="noopener noreferrer">
                              {company}
                            </Link>
                          </div>
                          <div className="font-light">{date}</div>
                        </div>
                        <div className="prose max-w-none pt-2 text-gray-500 dark:text-gray-400">
                          <MDXLayoutRenderer code={body.code} />
                        </div>

                        <div className="flex flex-wrap pt-4">
                          {tech?.map((t) => (
                            <Tech key={t} text={t} />
                          ))}
                        </div>
                      </article>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
