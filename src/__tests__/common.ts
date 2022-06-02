import { upperCamel, lowerCamel, snake } from '../common'

// snake
test('snakecase to snakecase', () => {
  expect(snake('snakecase')).toBe('snakecase')
})

test('_snake_case_ to _snake_case_', () => {
  expect(snake('_snake_case_')).toBe('_snake_case_')
})

test('SnakeCase to snake_case', () => {
  expect(snake('SnakeCase')).toBe('snake_case')
})

test('snakeCase to snake_case', () => {
  expect(snake('snakeCase')).toBe('snake_case')
})

test('_snakeCase_ to _snake_case_', () => {
  expect(snake('_snakeCase_')).toBe('_snake_case_')
})

test('snakecases to snakecase', () => {
  expect(snake('snakecases')).toBe('snakecase')
})

test('_snake_cases_ to _snake_cases_', () => {
  expect(snake('_snake_cases_')).toBe('_snake_cases_')
})

// snake pluralize
test('snakecase to snakecase', () => {
  expect(snake('snakecase', true)).toBe('snakecases')
})

test('_snake_case_ to _snake_case_s', () => {
  expect(snake('_snake_case_', true)).toBe('_snake_case_s')
})

test('SnakeCase to snake_case', () => {
  expect(snake('SnakeCase', true)).toBe('snake_cases')
})

test('snakeCase to snake_case', () => {
  expect(snake('snakeCase', true)).toBe('snake_cases')
})

test('_snakeCase_ to _snake_case_s', () => {
  expect(snake('_snakeCase_', true)).toBe('_snake_case_s')
})

test('snakecases to snakecase', () => {
  expect(snake('snakecases', true)).toBe('snakecases')
})

test('_snake_cases_ to _snake_cases_s', () => {
  expect(snake('_snake_cases_', true)).toBe('_snake_cases_s')
})

test('SnakeCases to snake_case', () => {
  expect(snake('SnakeCases', true)).toBe('snake_cases')
})

// upperCamel
test('snakecase to Snakecase', () => {
  expect(upperCamel('snakecase')).toBe('Snakecase')
})

test('_snake_case_ to SnakeCase', () => {
  expect(upperCamel('_snake_case_')).toBe('SnakeCase')
})

test('SnakeCase to SnakeCase', () => {
  expect(upperCamel('SnakeCase')).toBe('SnakeCase')
})

test('snakeCase to snakeCase', () => {
  expect(upperCamel('snakeCase')).toBe('SnakeCase')
})

test('_snakeCase_ to SnakeCase', () => {
  expect(upperCamel('_snakeCase_')).toBe('SnakeCase')
})

test('snakecases to snakecase', () => {
  expect(upperCamel('snakecases')).toBe('Snakecase')
})

test('_snake_cases_ to SnakeCases', () => {
  expect(upperCamel('_snake_cases_')).toBe('SnakeCases')
})

test('SnakeCases to snake_case', () => {
  expect(upperCamel('SnakeCases')).toBe('SnakeCase')
})

// upperCamel pluralize
test('snakecase to snakecases', () => {
  expect(upperCamel('snakecase', true)).toBe('Snakecases')
})

test('_snake_case_ to SnakeCases', () => {
  expect(upperCamel('_snake_case_', true)).toBe('SnakeCaseS')
})

test('SnakeCase to snakeCases', () => {
  expect(upperCamel('SnakeCase', true)).toBe('SnakeCases')
})

test('snakeCase to snakeCases', () => {
  expect(upperCamel('snakeCase', true)).toBe('SnakeCases')
})

test('_snakeCase_ to SnakeCases', () => {
  expect(upperCamel('_snakeCase_', true)).toBe('SnakeCaseS')
})

test('snakecases to snakecases', () => {
  expect(upperCamel('snakecases', true)).toBe('Snakecases')
})

test('_snake_cases_ to SnakeCases', () => {
  expect(upperCamel('_snake_cases_', true)).toBe('SnakeCasesS')
})

test('SnakeCases to SnakeCases', () => {
  expect(upperCamel('SnakeCases', true)).toBe('SnakeCases')
})

// lowerCamel
test('snakecase to snakecase', () => {
  expect(lowerCamel('snakecase')).toBe('snakecase')
})

test('_snake_case_ to SnakeCases', () => {
  expect(lowerCamel('_snake_case_')).toBe('SnakeCase')
})

test('SnakeCase to snakeCase', () => {
  expect(lowerCamel('SnakeCase')).toBe('snakeCase')
})

test('snakeCase to snakeCase', () => {
  expect(lowerCamel('snakeCase')).toBe('snakeCase')
})

test('_snakeCase_ to SnakeCases', () => {
  expect(lowerCamel('_snakeCase_')).toBe('SnakeCase')
})

test('snakecases to snakecase', () => {
  expect(lowerCamel('snakecases')).toBe('snakecase')
})

test('_snake_cases_ to SnakeCases', () => {
  expect(lowerCamel('_snake_cases_')).toBe('SnakeCases')
})

test('SnakeCases to snakeCase', () => {
  expect(lowerCamel('SnakeCases')).toBe('snakeCase')
})

// lowerCamel pluralize
test('snakecase to snakecases', () => {
  expect(lowerCamel('snakecase', true)).toBe('snakecases')
})

test('_snake_case_ to SnakeCases', () => {
  expect(lowerCamel('_snake_case_', true)).toBe('SnakeCaseS')
})

test('SnakeCase to snakeCases', () => {
  expect(lowerCamel('SnakeCase', true)).toBe('snakeCases')
})

test('snakeCase to snakeCases', () => {
  expect(lowerCamel('snakeCase', true)).toBe('snakeCases')
})

test('_snakeCase_ to SnakeCases', () => {
  expect(lowerCamel('_snakeCase_', true)).toBe('SnakeCaseS')
})

test('snakecases to snakecases', () => {
  expect(lowerCamel('snakecases', true)).toBe('snakecases')
})

test('_snake_cases_ to SnakeCases', () => {
  expect(lowerCamel('_snake_cases_', true)).toBe('SnakeCasesS')
})

test('SnakeCases to snakeCases', () => {
  expect(lowerCamel('SnakeCases', true)).toBe('snakeCases')
})
