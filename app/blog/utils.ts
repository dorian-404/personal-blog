import fs from 'fs'
import path from 'path'
import { Locale } from 'app/i18n'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  tags?: string
  slug?: string
  translationKey: string
}

type Heading = {
  level: number
  title: string
  slug: string
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function extractHeadings(content: string) {
  let headingRegex = /^(##|###)\s+(.*)$/gm
  let match
  let headings: Heading[] = []

  while ((match = headingRegex.exec(content)) !== null) {
    let level = match[1].length
    let title = match[2].trim()

    headings.push({
      level,
      title,
      slug: slugify(title),
    })
  }

  return headings
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

function getReadingTime(content: string) {
  let words = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`.*?`/g, ' ')
    .replace(/[#>*_\-\[\]\(\)]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.ceil(words / 200))
}

function getTags(metadata: Metadata) {
  if (!metadata.tags) {
    return []
  }

  return metadata.tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = metadata.slug || path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
      headings: extractHeadings(content),
      readingTime: getReadingTime(content),
      tags: getTags(metadata),
    }
  })
}

export function getBlogPosts(locale: Locale) {
  return getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts', locale))
}

export function getBlogPost(locale: Locale, slug: string) {
  return getBlogPosts(locale).find((post) => post.slug === slug)
}

export function formatDate(
  date: string,
  locale: Locale,
  includeRelative = false
) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = locale === 'fr' ? `il y a ${yearsAgo} an${yearsAgo > 1 ? 's' : ''}` : `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = locale === 'fr' ? `il y a ${monthsAgo} mois` : `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = locale === 'fr' ? `il y a ${daysAgo} j` : `${daysAgo}d ago`
  } else {
    formattedDate = locale === 'fr' ? "Aujourd'hui" : 'Today'
  }

  let fullDate = targetDate.toLocaleString(locale === 'fr' ? 'fr-CA' : 'en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
