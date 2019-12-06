require "byebug"

code_file = []
File.readlines('puzzle_input.txt').each do |line|
  code_file = line
end

def coder(code_input)
  code = code_input.split(",").map! {|n| n.to_i}
  # code.each_with_index do |n, i|
  i = 0
  while i < code.length
    n = code[i]
    if n == 1
      code[code[i + 3]] = code[code[i+1]] + code[code[i+2]]
      i += 4
    elsif n == 2
      code[code[i + 3]] = code[code[i+1]] * code[code[i+2]]
      i += 4
    elsif n == 3
      puts "waiting for input"
      val = gets.chomp.to_i
      code[code[i + 1]] = val
      i += 2
    elsif n == 4
      puts code[code[i + 1]]
      i += 2
    elsif n == 99
      # p code
      return code[0]
      i += 4
      break
    else
      opcode = n.to_s[-2..-1].to_i
      # puts "#{opcode} #{i}"
      n.to_s[-3] == "1" ? pos1 = code[i + 1] : pos1 = code[code[i+1]]
      n.to_s[-4] == "1" ? pos2 = code[i + 2] : pos2 = code[code[i+2]]
      # debugger
      # n.to_s[-5] == "1" ? pos3 = code[i + 3] : pos3 = code[code[i+3]]
      # here comes repetitive code
      if opcode == 1
        code[code[i+3]] = pos1 + pos2
        i += 4
      elsif opcode == 2
        code[code[i+3]] = pos1 * pos2
        i += 4
      elsif opcode == 3
        puts "waiting for input"
        val = gets.chomp
        code[code[i + 1]] = val
        i += 2
      elsif opcode == 4
        puts code[code[i + 1]]
        i += 2
      elsif opcode == 99
        # p code
        return code[0]
        i += 4
        break
      end
    end
  end
  # p code
  puts return code[0]
end

coder(code_file)