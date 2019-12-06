code_file = []
File.readlines('puzzle_input.txt').each do |line|
  code_file = line
end


def try_codes(code_input)
  initial_code = code_input.split(",").map! {|n| n.to_i}
  # new_code = initial_code.dup
  i = 0
  j = 0
  result = 0
  while i < 100
    while j < 100
      new_code = initial_code.dup
      new_code[1] = i
      new_code[2] = j
      result = coder(new_code)
      # result = new_code[0]
      # p [result, i, j]
      puts (100 * i) + j if result == 19690720
      j += 1
    end
    j = 0
    i += 1
  end
end

def coder(code)
  code.each_with_index do |n, i|
    if i % 4 == 0
      if n == 1
        code[code[i + 3]] = code[code[i+1]] + code[code[i+2]]

      elsif n == 2
        code[code[i + 3]] = code[code[i+1]] * code[code[i+2]]
      else
        return code[0]
        break
      end
    end
  end
  return code[0]
end

try_codes(code_file)