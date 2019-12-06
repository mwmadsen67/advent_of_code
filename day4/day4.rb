# pw_range = 178416-676461

def pw_ranger(pw_start, pw_end)
  pw_s = pw_start.to_s
  pw_e = pw_end.to_s

  valid = 0
  until pw_s == pw_e
    i = 0
    less_good = true
    while i < 5
       less_good = false if pw_s[i].to_i > pw_s[i+1].to_i
       i += 1
    end
    if less_good == false
      pw_s = (pw_s.to_i + 1).to_s
      next
    end
    i = 0
    # adj_count = 0
    adj_good = false
    while i < 5
      if (pw_s[i] == pw_s[i+1]) && (pw_s[i+1] != pw_s[i+2]) && (pw_s[i-1] != pw_s[i])
        adj_good = true
      end
      i += 1
    end
    # p [pw_s, less_good, adj_good]
    if adj_good && less_good
      valid += 1 
      # p pw_s
    end
    pw_s = (pw_s.to_i + 1).to_s
  end
  return valid
end

p pw_ranger(178416, 676461)