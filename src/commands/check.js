import { applyLibraries, applyTemplates } from './fix'

export function check (config, project) {
  return [
    ...applyLibraries(config, project.libs, false),
    ...applyTemplates(config, project.templates, false)
  ]
}
